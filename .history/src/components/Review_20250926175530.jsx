import DefaultPhoto from "../assets/logo.png";
import { useLanguage } from "./useUser";
import { mockedReviews } from "../Utils/Reviews";
import { mockUsers } from "../Utils/user";
import "./"

export function ReviewContent() {
    const allUsers = [...mockUsers];
    const allReviews = [...mockedReviews];
    const { language } = useLanguage();

    const allUsersIds = allUsers.map(user => user.userId);
    
}