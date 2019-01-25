

const initUsers = [
    { id: 1, name: 'admin', tel:'1234567890', email:'shmilycai@sina.cn', status:true, desc:'admin', operate:'aaa' },
    { id: 2, name: 'cai-1', tel:'1234567890', email:'shmilycai@sina.cn', status:true, desc:'admin', operate:'aaa' },
    { id: 3, name: 'cai-2', tel:'1234567890', email:'shmilycai@sina.cn', status:true, desc:'admin', operate:'aaa' },
    { id: 4, name: 'cai-3', tel:'1234567890', email:'shmilycai@sina.cn', status:true, desc:'admin', operate:'aaa' },
    { id: 5, name: 'cai-4', tel:'1234567890', email:'shmilycai@sina.cn', status:true, desc:'admin', operate:'aaa' },
    { id: 6, name: 'cai-5', tel:'1234567890', email:'shmilycai@sina.cn', status:true, desc:'admin', operate:'aaa' },
    { id: 7, name: 'cai-6', tel:'1234567890', email:'shmilycai@sina.cn', status:true, desc:'admin', operate:'aaa' },
    { id: 8, name: 'cai-7', tel:'1234567890', email:'shmilycai@sina.cn', status:true, desc:'admin', operate:'aaa' },
    { id: 9, name: 'cai-8', tel:'1234567890', email:'shmilycai@sina.cn', status:true, desc:'admin', operate:'aaa' },
    { id: 10, name: 'caicai', tel:'1234567890', email:'shmilycai@sina.cn', status:true, desc:'admin', operate:'aaa' }
  ]

  export default{
      getUsers(cb:(users:any[]) => void){
          setTimeout(() => cb(initUsers), 100);
      },
      addUser(user:any){
        setTimeout(() => initUsers.push(user), 100);
      },
      deleteUser(id:number){
      },
      getUser(){},
      updateUser(){}
  }