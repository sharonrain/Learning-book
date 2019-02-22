## 监控目录 
> 监控是否产生变化，并将改动文件rsync到/home/www3目录 
> 利用文件的md5监控文件，如果md5值与上次不同，即发生变化

    #! /bin/bash
    webroot="/home/www/"
    cp /dev/null rsync_file
    if [ ! -f file.md5 ];then
      find $webroot -type f -exec md5sum {} \; >>file.md5
    else
      for file in $(md5sum -c file.md5|awk -F':' '/FAILED/{print $1}')
        do
          if [ -f $file ];then
          filename_z=$(echo $file|sed 's#/#\\/#g')
          sed -i "/ $filename_z/"d file.md5
          md5sum $file >> file.md5
          echo $file >> rsync_file
          else
          echo $file >>rsync_rm
          fi
        done
      for newfile in $(find $webroot -type f)
        do
          grep $newfile file.md5 >/dev/null 2>&1
          if [ $? -gt 0 ];then
          md5sum $newfile >> file.md5
          echo "$newfile" >> rsync_file
          fi
        done
    for rfile in $(cat rsync_file)
    do
    rsync -avzp $rfile /home/www3/
    done
