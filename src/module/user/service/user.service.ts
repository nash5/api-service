import { Injectable } from '@nestjs/common';
import { UserDTO } from '../model/user.dto';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(private readonly _config: ConfigService) {}

  async find(): Promise<UserDTO[]> {
    try {
      let path = this._config.get('file_path');
      // Check if file exists
      if (!fs.existsSync(path)) {
        return [];
      }
      return JSON.parse(fs.readFileSync(path, 'utf-8'));
    } catch (err) {
      return err;
    }
  }

  async create(createUserDto: UserDTO): Promise<UserDTO> {
    try {
      let path = this._config.get('file_path');

      fs.writeFileSync(path, JSON.stringify([createUserDto], null, 2), 'utf-8');

      return JSON.parse(fs.readFileSync(path, 'utf-8'));
    } catch (err) {
      return err;
    }
  }

  async update(updateUserDto: UserDTO): Promise<UserDTO[]> {
    try {
      let path = this._config.get('file_path');

      // Check if file exists
      if (!fs.existsSync(path)) {
        return [];
      }

      let data = JSON.parse(fs.readFileSync(path, 'utf-8'));

      Array.isArray(data) ? data.push(updateUserDto) : (data = [updateUserDto]);

      fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
      return JSON.parse(fs.readFileSync(path, 'utf-8'));
    } catch (err) {
      return err;
    }
  }

  async findById(user_id: string) {
    try {
      let path = this._config.get('file_path');

      // Check if file exists
      if (!fs.existsSync(path)) {
        return [];
      }

      let data = JSON.parse(fs.readFileSync(path, 'utf-8'));

      return data.find((v: UserDTO) => v.id === user_id) || [];
    } catch (err) {
      return err;
    }
  }
}
