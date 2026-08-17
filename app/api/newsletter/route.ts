import { NextRequest, NextResponse } from 'next/server';
import { db, isConfigured } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Subscriber = {
  email: string;
  subscribedAt: string;
};

// In-memory fallback if Firebase is not configured.
let fallbackSubscribers: Subscriber[] = [];

const normalizeEmail = (value: unknown): string | null => {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmedEmail = value.trim().toLowerCase();
  return trimmedEmail && EMAIL_REGEX.test(trimmedEmail) ? trimmedEmail : null;
};

const parseSubscriptionPayload = async (request: NextRequest): Promise<{ email?: string }> => {
  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    const rawBody = await request.text();

    if (!rawBody.trim()) {
      return {};
    }

    try {
      const parsedBody = JSON.parse(rawBody);

      if (typeof parsedBody === 'string') {
        return { email: normalizeEmail(parsedBody) ?? undefined };
      }

      if (parsedBody && typeof parsedBody === 'object') {
        return { email: normalizeEmail((parsedBody as Record<string, unknown>).email) ?? undefined };
      }

      return {};
    } catch {
      return { email: normalizeEmail(rawBody) ?? undefined };
    }
  }

  const formData = await request.formData();
  const emailValue = formData.get('email');

  return { email: normalizeEmail(emailValue) ?? undefined };
};

export async function POST(request: NextRequest) {
  try {
    const { email } = await parseSubscriptionPayload(request);
    const cleanEmail = normalizeEmail(email);

    if (!cleanEmail) {
      return NextResponse.json(
        { message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    if (isConfigured && db) {
      const subscribersRef = collection(db, 'newsletter_subscribers');
      const q = query(subscribersRef, where('email', '==', cleanEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        return NextResponse.json(
          { message: 'Email is already subscribed to our newsletter' },
          { status: 409 }
        );
      }

      await addDoc(subscribersRef, {
        email: cleanEmail,
        subscribedAt: new Date().toISOString()
      });

      console.log(`[NEWSLETTER] New subscriber added to Firestore: ${cleanEmail}`);
    } else {
      const existingSubscriber = fallbackSubscribers.find(sub => sub.email === cleanEmail);
      if (existingSubscriber) {
        return NextResponse.json(
          { message: 'Email is already subscribed to our newsletter' },
          { status: 409 }
        );
      }

      fallbackSubscribers.push({
        email: cleanEmail,
        subscribedAt: new Date().toISOString()
      });

      console.warn('[NEWSLETTER] Firebase not configured. Subscriber stored in fallback memory.');
    }

    return NextResponse.json(
      {
        message: 'Successfully subscribed to newsletter!',
        totalSubscribers: isConfigured && db ? 'Unknown' : fallbackSubscribers.length
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (isConfigured && db) {
      const q = query(collection(db, 'newsletter_subscribers'), orderBy('subscribedAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map(doc => {
        const docData = doc.data();
        let subscribedAt = docData.subscribedAt;

        if (subscribedAt && typeof subscribedAt === 'object' && 'toDate' in subscribedAt) {
          subscribedAt = (subscribedAt as { toDate: () => Date }).toDate().toISOString();
        }

        return {
          email: docData.email || '',
          subscribedAt: subscribedAt || new Date().toISOString()
        };
      });

      return NextResponse.json({
        subscribers: data.length,
        data
      });
    }

    return NextResponse.json({
      subscribers: fallbackSubscribers.length,
      data: [...fallbackSubscribers].sort((a, b) =>
        new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime()
      )
    });
  } catch (error) {
    console.error('Failed to fetch subscribers:', error);
    return NextResponse.json(
      { message: 'Failed to retrieve newsletter subscribers' },
      { status: 500 }
    );
  }
}