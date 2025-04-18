import { IUserRepository, IUserService, User } from "../types/usersType";

export class UserService implements IUserService {
    private userRepository: IUserRepository;
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }
    
    async createUser(data: User): Promise<User> {
        return this.userRepository.create(data);
    }

    async findUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findUserById(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }

    async updateUser(id: string, data: Partial<User>): Promise<User | null> {
        return this.userRepository.update(id, data);
    }

    async deleteUser(id: string): Promise<string | null> {
        return this.userRepository.delete(id);
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }
    async saveResetToken(userId: string, token: string) {
        await this.userRepository.update(userId, { resetToken: token });
      }

      async updatePassword(userId: string, newPassword: string) {
        await this.userRepository.update(userId, { password: newPassword, resetToken: null });
      }
}