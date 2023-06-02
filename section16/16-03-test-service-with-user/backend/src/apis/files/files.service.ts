import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import {
  IFilesServiceUpload,
  IFilesServiceUploads,
} from './interfaces/files-service.interface';
import { promises } from 'dns';
import { resolve } from 'path';
import { rejects } from 'assert';

@Injectable()
export class FilesService {
  // upload({ file }: IFilesServiceUpload): string {
  //   //1. 파일을 클라우드 스토리지에 저장하는 로직
  //   // 1-1) 스토리지 셋팅하기
  //   const storage = new Storage({
  //     projectId: 'backend-388310',
  //     keyFilename: 'backend-388310-232fccc32a57.json',
  //   }).bucket('codecamp-storage-gamja');
  //   // 1-2) 스리에 파일 올리기
  //   file.createReadStream().pipe(
  //     storage
  //       .file('aaa.png')
  //       .createWriteStream()
  //       .on('finish', () => {
  //         console.log('성공');
  //       })
  //       .on('error', () => {
  //         console.log('에러');
  //       }),
  //   );
  //   console.log('파일 전송이 완료되었습니다. ');
  //   return '끝!';
  // }

  async uploads({ files }: IFilesServiceUploads): Promise<string[]> {
    console.log(files);
    const bucket = 'codecamp-storage-gamja';
    const storage = new Storage({
      projectId: 'backend-388310',
      keyFilename: 'backend-388310-232fccc32a57.json',
    }).bucket(bucket);

    const waitedFiles = await Promise.all(files);

    const results = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise<string>((resolve, reject) => {
            el.createReadStream()
              .pipe(storage.file(el.filename).createWriteStream())
              .on('finish', () => resolve(`${bucket}/${el.filename}`))
              .on('error', () => reject('실패'));
          }),
      ),
    );

    console.log('파일 전송이 완료되었습니다. ');

    return results;
  }
}
