import { GitHubIssuePayload, GitHubStarPayload } from "../../interfaces";

export class GitHubService {

    constructor(){}

    onStart(payload: GitHubStarPayload): string{

        // let message: string = '';

        const {action, sender, repository, starred_at} =payload; //fecha de la estrella
        // console.log(starred_at);
        // console.log(payload);

        // return message = `User ${sender.login} ${action} star on ${repository.full_name} at ${starred_at}`;

        return `User ${sender.login} ${action} star on ${repository.full_name} at ${starred_at}`;
        
    }

    onIssue(payload: GitHubIssuePayload): string {
        
        const { action, issue} = payload;

        if(action === 'opened'){
            // const message = `An issue was opened with title ${issue.title}`;
            // console.log(message);
            // return message;

            return `An issue was opened with title ${issue.title}`; //en contsto real sera asi 
        }

        //Usuario que lo cerro
        if(action === 'closed'){
            return `An issue was closed by ${issue.user.login} with title ${issue.title}`;
        }

        //Issue que fue reabierto
        if(action === 'reopened'){
            return `An issue was reopened by ${issue.user.login} with title ${issue.title}`;
        }

        //si estro evento
        return `Unhandle action for the issue event ${action}`;
    }
}