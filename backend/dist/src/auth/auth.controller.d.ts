import { AuthService } from './auth.service';
import { signInDto } from './dto/signIn.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: signInDto): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
}
