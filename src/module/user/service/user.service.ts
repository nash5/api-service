import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
import { UserDTO } from '../model/user.dto';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(private readonly _config: ConfigService) {}

  async find(): Promise<UserDTO[]> {
    try {
      return JSON.parse(
        fs.readFileSync(this._config.get('file_path'), 'utf-8'),
      );
    } catch (err) {
      return err;
    }
  }

  async create(createUserDto: UserDTO): Promise<UserDTO> {
    try {      
      fs.writeFileSync(
        this._config.get('file_path'),
        JSON.stringify([createUserDto], null, 2),
        'utf-8',
      );

      return JSON.parse(
        fs.readFileSync(this._config.get('file_path'), 'utf-8'),
      );
    } catch (err) {
      return err;
    }
  }

  async update(updateUserDto: UserDTO): Promise<UserDTO[]> {
    try {
      let data = JSON.parse(
        fs.readFileSync(this._config.get('file_path'), 'utf-8'),
      );

      Array.isArray(data) ? data.push(updateUserDto) : (data = [updateUserDto]);

      fs.writeFileSync(
        this._config.get('file_path'),
        JSON.stringify(data, null, 2),
        'utf-8',
      );
      return JSON.parse(
        fs.readFileSync(this._config.get('file_path'), 'utf-8'),
      );
    } catch (err) {
      return err;
    }
  }

  async findById(user_id: string) {
    try {
      let data = JSON.parse(
        fs.readFileSync(this._config.get('file_path'), 'utf-8'),
      );

      return data.find((v: UserDTO) => v.id === user_id) || [];
    } catch (err) {
      return err;
    }
  }
}
