
# File system
## 1.Basic
- 所谓"格式化"，就是为硬盘安装文件系统。
- 不同的操作系统有不同的文件系统，Linux 使用 ext4，OSX使用 HFS +，Windows 使用 NTFS，Solaris 和 Unix 使用ZFS
- Windows 系统主要有三种文件系统: FAT32(32位，文件<4GB), NTFS(默认), exFAT（FAT的64位版本, Mac 和 Linux 电脑可以读写这种系统）

## 2.硬盘在别的系统上用
- 格式化为exFAT
  - window 资源管理器
  - Mac，磁盘工具格式化
  - Linux
    - 找路径： sudo fdisk -l
    - 格式化： sudo mkfs.exfat /dev/sdX1(X代表设备序号，a,b,c... 1代表第一个分区)
    - exFAT只能格式化硬盘的分区，没有分区必须先分区
    - 分区
      - sudo gdisk /dev/sdX
      - o命令表示创建 GPT 分区表.
      - n命令表示新建一个分区
      - w命令表示写入所有变更
