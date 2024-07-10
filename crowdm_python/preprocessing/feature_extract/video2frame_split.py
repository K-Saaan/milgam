import argparse  # 명령줄 인수 파싱을 위한 모듈
import sys
import os  # 운영 체제 인터페이스 모듈
import os.path as osp  # 경로 조작을 위한 모듈 별칭
import glob  # 파일 경로 패턴 매칭을 위한 모듈
import cv2  # OpenCV 라이브러리
import ipdb  # 인터랙티브 디버거

def dump_frames(vid_item):
    full_path, vid_path, vid_id = vid_item  # 비디오 경로, 비디오 아이디
    print(vid_path)
    print(full_path)
    vid_name = vid_path.split("\\")  # 비디오 경로를 '/' 기준으로 분할
    out_full_path = osp.join("UCF_Crime_Frames", vid_name[0], vid_name[1].replace(".mp4",""))  # 출력 경로 설정
    if not os.path.exists(out_full_path):
        os.makedirs(out_full_path)  # 출력 경로가 없으면 생성

    vr = cv2.VideoCapture(full_path)  # 비디오 파일 열기
    videolen = int(vr.get(cv2.CAP_PROP_FRAME_COUNT))  # 비디오의 총 프레임 수
    for i in range(videolen):
        ret, frame = vr.read()  # 프레임 읽기
        if ret == False:
            continue
        img = frame[:, :, ::-1]  # 이미지 색상 변환 (BGR에서 RGB로)
        img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)  # 다시 BGR로 변환
        if img is not None:
            cv2.imwrite('{}/img_{:08d}.jpg'.format(out_full_path, i + 1), img)  # 프레임 저장
        else:
            print('[Warning] length inconsistent! Early stop with {} out of {} frames'.format(i + 1, videolen))
            break  # 프레임이 None이면 중단
    print('full_path={} vid_name={} num_frames={} dump_frames done'.format(full_path, vid_name, videolen))
    sys.stdout.flush()  # 출력 버퍼를 비움
    return True

def parse_args():
    parser = argparse.ArgumentParser(description='extract optical flows')  # 명령줄 인수 파서 생성
    parser.add_argument('--src_dir', default="UCF-Crime/", type=str)  # 소스 디렉토리
    parser.add_argument('--out_dir', default="UCF_Crime_Frames/", type=str)  # 출력 디렉토리
    parser.add_argument('--level', type=int, choices=[1, 2], default=1)  # 레벨 설정 (1 또는 2)
    parser.add_argument('--num_worker', type=int, default=8)  # 작업자 수
    parser.add_argument("--out_format", type=str, default='dir', choices=['dir', 'zip'], help='output format')  # 출력 형식
    parser.add_argument("--ext", type=str, default='mp4', choices=['avi', 'mp4'], help='video file extensions')  # 비디오 파일 확장자
    parser.add_argument("--resume", action='store_true', default=False, help='resume optical flow extraction instead of overwriting')  # 작업 재개 옵션
    args = parser.parse_args()  # 인수 파싱
    return args

if __name__ == '__main__':
    args = parse_args()  # 명령줄 인수 파싱
    if not osp.isdir(args.out_dir):  # 출력 디렉토리가 없으면 생성
        print('Creating folder: {}'.format(args.out_dir))
        os.makedirs(args.out_dir)
    if args.level == 2:
        classes = os.listdir(args.src_dir)  # 소스 디렉토리 내 클래스 목록
        for classname in classes:
            new_dir = osp.join(args.out_dir, classname)
            if not osp.isdir(new_dir):  # 클래스별 출력 디렉토리 생성
                print('Creating folder: {}'.format(new_dir))
                os.makedirs(new_dir)

    print('Reading videos from folder: ', args.src_dir)
    print('Extension of videos: ', args.ext)
    print("args.src_dir:", args.src_dir)
    if args.level == 2:
        fullpath_list = glob.glob(args.src_dir + '/*/*')  # 모든 비디오 파일 경로 가져오기 (레벨 2)
        done_fullpath_list = glob.glob(args.out_dir + '/*/*')  # 완료된 비디오 파일 경로
    elif args.level == 1:
        fullpath_list = glob.glob(args.src_dir + '/*')  # 모든 비디오 파일 경로 가져오기 (레벨 1)
        done_fullpath_list = glob.glob(args.out_dir + '/*')  # 완료된 비디오 파일 경로
    print('Total number of videos found: ', len(fullpath_list))
    if args.resume:
        fullpath_list = set(fullpath_list).difference(set(done_fullpath_list))  # 재개 옵션일 경우, 완료된 비디오를 제외
        fullpath_list = list(fullpath_list)
        print('Resuming. number of videos to be done: ', len(fullpath_list))

    if args.level == 2:
        vid_list = list(map(lambda p: osp.join('/'.join(p.split('/')[-2:])), fullpath_list))  # 비디오 경로 리스트 생성 (레벨 2)
    elif args.level == 1:
        vid_list = list(map(lambda p: p.split('/')[-1], fullpath_list))  # 비디오 경로 리스트 생성 (레벨 1)
    
    # 디버거 중단점 설정
    # ipdb.set_trace()
    
    # 순차적으로 dump_frames 함수 실행하여 비디오 프레임을 추출
    for vid_item in zip(fullpath_list, vid_list, range(len(vid_list))):
        dump_frames(vid_item)
