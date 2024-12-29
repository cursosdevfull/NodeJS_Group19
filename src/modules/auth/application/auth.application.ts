import { CypherService } from '../../../core/utils/cypher.service';
import { TokenService } from '../../../core/utils/token.service';
import { UserPort } from '../../user/ports/user.port';
import { Auth } from '../models/auth';
import { Tokens } from '../ports/auth.port';

export class AuthApplication {
  constructor(private readonly userPort: UserPort) {}

  async login(auth: Auth): Promise<Tokens | null> {
    const userFound = await this.userPort.findByEmail(auth.email);

    if (!userFound) {
      return null;
    }

    const passwordMatch = await CypherService.compare(
      auth.password,
      userFound.password,
    );

    if (!passwordMatch) {
      return null;
    }

    return {
      accessToken: TokenService.generateAccessToken(
        userFound.firstname,
        userFound.lastname,
        userFound.roles.map((role) => ({ id: role.id, name: role.name })),
      ),
      refreshToken: userFound.refreshToken!,
    };
  }
}
