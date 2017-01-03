c1=[[{'b': 't','e': 'f', 'result':[{'pim':'t'}]}, {'s': 'o',"y":"t"},{'ting':'he'}]]
d1=[[{'s': 'x',"y":"t",'q':'w'},{'ting':'he'},{'b': 'r','e': 'f','result':[{'pim':'t'}]}]]

def compare(list1_1,list1_2):
    def comperlist(list1,list2):
    
        count=0
        okkey=[]
        diffkey=[]
        diffkey1=[]
        misskey=[]
        misskey1=[]
        for i in range(len(list1)):
           for j in range(len(list1[i])):
               for n in range(len(list2)):
                   for key in list1[i][j].keys():
                       countok=0
                       countdiff=0
                       for m in range(len(d1[n])):
                          #print key
                          try:
                              if list1[i][j][key]==list2[n][m][key]:
                                  #print "the value for key " + str(key) + " is same between list1 and d1!"
                                  #print i,j,n,m
                                  countok+=1
                                  #okkey.append(str(key))
                              else:
                                  print "the value for key " + str(key) + " is different between list1 and list2!"
                                  countdiff+=1

                                  tuple_temp=(j,m,key,'c1:%s,d1: %s ' %  (list1[i][j][key],list2[n][m][key]))
                                  diffkey1.append(tuple_temp)
                                  #diffkey.append(str(key))
                          except KeyError:
                              count+=1
                       if countok==0 and countdiff==0:
                            print "the value for key " + str(key) + " is miss in list2!"
                            tuple_temp=(j,m,key)
                            misskey1.append(tuple_temp)
                            #misskey.append(str(key))
                   
        return diffkey1,misskey1

    diffkey11_2,misskey11_2=comperlist(list1_1,list1_2)
    diffkey12_1,misskey12_1=comperlist(list1_2,list1_1)
    return diffkey11_2,misskey11_2 ,misskey12_1

print compare(c1,d1)

