import { Request, Response } from "express";
import { GitHubService } from "../services/github-service";
import { DiscordService } from "../services/discord-service";

export class GithubController {

    constructor(
        private readonly githubService = new GitHubService(),
        private readonly discordService = new DiscordService(),
    ){}

    webhookHandler = (req: Request, res: Response) => {
        
        //Obtener el tipo de evento.
        const githubEvent = req.header('x-github-event') ?? 'unknown'; //si no viene unknown
        //Verificacion de la firma.
        // const signature = req.header('x-hub-signature-256') ?? 'unknown'; //si no viene unknown
        const payload = req.body
        // console.log(payload);
        // console.log({githubEvent});
        // console.log(JSON.stringify(payload));

        let message: string;

        switch(githubEvent){
            case 'star':
                message = this.githubService.onStart(payload);
            break;
            case 'issues':
                message = this.githubService.onIssue(payload);
            break;


            default:
                // console.log(`Unknown  event ${githubEvent}`);
                message = `Unknown  event ${githubEvent}`;
        }

        // console.log(message);
        this.discordService.notify(message)
            .then(() => res.status(202).send('accepted'))
            .catch(() => res.status(500).json({error: 'Internal server error'}));
            
    }
}