import Collegeprofile from "@/components/Collegeprofile";
import { getCurrentUser } from "@/lib/actions/auth.actions";
import { getInterviewById, getLatesInterviews } from "@/lib/actions/general.action";


const page = async () => {
    // const user = await getCurrentUser();
    // const [userInterviews, latesInterviews] = await Promise.all([
    //     getInterviewById(user?.id!),
    //     getLatesInterviews({ userId: user?.id! })
    // ]);
    return (
        <Collegeprofile
            // user={user}
            // userInterviews={userInterviews}
            // latesInterviews={latesInterviews}
        />
    )
}

export default page
