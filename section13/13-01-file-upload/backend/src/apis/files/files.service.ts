import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { IFilesServiceUpload } from './interfaces/files-service.interface';

@Injectable()
export class FilesService {
  upload({ file }: IFilesServiceUpload): string {
    //1. 파일을 클라우드 스토리지에 저장하는 로직
    // 1-1) 스토리지 셋팅하기
    const storage = new Storage({
      projectId: 'backend-388310',
      keyFilename: 'backend-388310-232fccc32a57.json',
    }).bucket('codecamp-storage-gamja');
    // 1-2) 스리에 파일 올리기
    file.createReadStream().pipe(
      storage
        .file('aaa.png')
        .createWriteStream()
        .on('finish', () => {
          console.log('성공');
        })
        .on('error', () => {
          console.log('에러');
        }),
    );
    console.log('파일 전송이 완료되었습니다. ');
    return '끝!';
  }
}
