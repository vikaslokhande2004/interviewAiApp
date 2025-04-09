import { db } from "@/firebase/admin"

export async function getInterviewById(userId: string): Promise<Interview | null> {
    const interview = await db
        .collection('interviews')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();

    return interview.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))
}

export async function getLatesInterviews(params: GetLatestInterviewsParams): Promise<Interview | null> {
    const { userId, limit = 20 } = params;

    const interview = await db
        .collection('interviews')
        .orderBy('createdAt', 'desc')
        .where('finalized', '==', true)
        .where('userId', '!=', userId)
        .limit(limit)
        .get();

    return interview.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))
}

export async function getInterviewId(Id: string): Promise<Interview | null> {
    const interview = await db
        .collection('interviews')
        .doc(Id)
        .get();

    return interview.data() as Interview | null;
}