import { ILoginRepository, ILoginService, login } from "../types/loginType";

export class LoginService implements ILoginService {
    private loginRepository: ILoginRepository;
    constructor(loginRepository: ILoginRepository) {
        this.loginRepository = loginRepository;
    }

    async createLogin(data: login): Promise<login> {
        return this.loginRepository.create(data);
    }

    async findLogins(): Promise<login[]> {
        return this.loginRepository.find();
    }

    async findLoginById(id: string): Promise<login | null> {
        return this.loginRepository.findById(id);
    }

    async deleteLogin(id: string): Promise<string | null> {
        return this.loginRepository.delete(id);
    }

    async findByEmail(email: string): Promise<login | null> {
        return this.loginRepository.findByEmail(email);
    }

}