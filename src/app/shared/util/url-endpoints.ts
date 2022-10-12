import { environment } from "src/environments/environment";

export class UrlEndpoint {
    static ENDPOINT = {
        CATEGORY: `${environment.CATEGORY_API_URL}/category`,
        QUESTION: `${environment.QUESTION_API_URL}/question`,
    }
}