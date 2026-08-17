import { NextRequest, NextResponse } from 'next/server';
import { db, isConfigured } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

// Constants
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUIRED_FIELDS = ['firstName', 'lastName', 'email', 'message'] as const;

interface ContactMessage {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'read' | 'replied';
}

// In-memory fallback if Firebase is not configured
let fallbackContactMessages: ContactMessage[] = [];

const generateId = (): string => Date.now().toString() + Math.random().toString(36).substr(2, 9);
const validateEmail = (email: string): boolean => EMAIL_REGEX.test(email);
const validateRequired = (data: Record<string, any>): { valid: boolean; missing: string[] } => {
  const missing = REQUIRED_FIELDS.filter(field => !data[field]);
  return { valid: missing.length === 0, missing };
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, mobileNumber, message } = body;

    // Validate required fields
    const { valid, missing } = validateRequired({ firstName, lastName, email, message });
    if (!valid) {
      return NextResponse.json(
        { message: `Please fill in all required fields: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      mobileNumber: (mobileNumber || '').trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
      status: 'new'
    };

    let messageId = '';

    if (isConfigured && db) {
      // Save to Firebase Firestore
      const docRef = await addDoc(collection(db, 'contact_messages'), payload);
      messageId = docRef.id;
      console.log(`[CONTACT] Message stored in Firestore with ID: ${messageId}`);
    } else {
      // Fallback to in-memory storage
      messageId = generateId();
      fallbackContactMessages.push({
        id: messageId,
        ...payload,
        status: 'new'
      });
      console.warn('[CONTACT] Firebase not configured. Message stored in fallback memory.');
    }

    return NextResponse.json(
      { 
        message: 'Your message has been sent successfully! I will get back to you soon.',
        messageId: messageId
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { message: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (isConfigured && db) {
      // Fetch messages from Firestore
      const q = query(collection(db, 'contact_messages'), orderBy('submittedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const messages = querySnapshot.docs.map(doc => {
        const data = doc.data();
        // Handle Firestore Timestamp formatting if necessary
        let submittedAt = data.submittedAt;
        if (submittedAt && typeof submittedAt === 'object' && 'toDate' in submittedAt) {
          submittedAt = (submittedAt as any).toDate().toISOString();
        }
        return {
          id: doc.id,
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          mobileNumber: data.mobileNumber || '',
          message: data.message || '',
          submittedAt: submittedAt || new Date().toISOString(),
          status: data.status || 'new'
        };
      });

      return NextResponse.json({
        totalMessages: messages.length,
        messages
      });
    } else {
      // Fetch from fallback memory
      return NextResponse.json({
        totalMessages: fallbackContactMessages.length,
        messages: [...fallbackContactMessages].sort((a, b) => 
          new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
        )
      });
    }
  } catch (error) {
    console.error('Failed to fetch contact messages:', error);
    return NextResponse.json(
      { message: 'Failed to retrieve messages' },
      { status: 500 }
    );
  }
}