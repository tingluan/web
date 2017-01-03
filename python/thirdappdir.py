# -*- coding: gb18030 -*-
# -*- coding:utf-8 -*-
import time
import os
import datetime


def com(path):
    now_time1=datetime.date.today()
    yesterday_time=datetime.datetime.strftime(now_time1-datetime.timedelta(1),"%Y.%m.%d")
    lastweek_time5=datetime.datetime.strftime(now_time1-datetime.timedelta(4),"%Y.%m.%d")
    lastweek_time4=datetime.datetime.strftime(now_time1-datetime.timedelta(5),"%Y.%m.%d")
    lastweek_time3=datetime.datetime.strftime(now_time1-datetime.timedelta(6),"%Y.%m.%d")
    now_time=datetime.datetime.strftime(now_time1,"%Y.%m.%d")
    timelist=[now_time,yesterday_time,lastweek_time5,lastweek_time4,lastweek_time3]
    files=os.listdir(path)
    filename=[]
    file_dir=[]
    for fi in files:
        filename.append(os.path.join(fi))
    lastfiles=[x for x in timelist if x in filename]
    print lastfiles
    for files in lastfiles:
        path_now=os.path.join(path,files)
        #print path_now
        file_dir.append(gci(path_now))
        re_excel_dir,re_picture_dir=result1(file_dir)
    return re_excel_dir,re_picture_dir
     
   
def gci(filepath):
    #遍历filepath下所有文件，包括子目录。将特定日期文件下面的Excel及截图路径返回
    last_dir_exe=[]
    last_dir_picture=[]
    count=0
    files=os.listdir(filepath)
    for fi in files:
        #last_dir_exe.append(os.path.join(filepath,fi))
        fi_d=os.listdir(os.path.join(filepath,fi))
        for fi_dir in fi_d:
            if os.path.splitext(fi_dir)[1]=='.xls':
                last_dir_exe.append(os.path.join(os.path.join(filepath,fi),fi_dir))
            else:
                last_dir_picture.append(os.path.join(os.path.join(filepath,fi),fi_dir))
       
    return last_dir_exe,last_dir_picture
def result1(dir_app):
    #将excel和截图的路径分开
    excel_dir=[]
    picture_dir=[]
    for data in dir_app:
        excel_dir.append(data[0])
        picture_dir.append(data[1])
    return excel_dir, picture_dir
       
        
        
path_center=r"\\cdapp01\MIE-CD\02_Validation\06_Temp\TestThirdApp\APPcenter"
path_store=r"\\cdapp01\MIE-CD\02_Validation\06_Temp\TestThirdApp\AppStore"

def result(path1,path2):
    result_xls_center,result_picture_center=com(path1)
    result_xls_store,result_picture_store=com(path2)
    return result_xls_center,result_picture_center,result_xls_store,result_picture_store
    
r=result(path_center,path_store)
print r[0]
    
