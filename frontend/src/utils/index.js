/* eslint-disable */
import axios from 'axios'; // 引入axios
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到
// vant的toast提示框组件，大家可根据自己的ui组件更改。
import { Toast } from 'vant'; 
import store from '../store/store'

axios.defaults.baseURL = 'http://localhost:9988/xc';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 请求封装

/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function get(url, data){   
  Toast.loading ({
    message: "加载中...",
    forbidClick: true,
    duration: 0,
    className: 'van-loading-custom',
  }); 
  return new Promise((resolve, reject) =>{             
      axios.get(url, {                
        params: data
      })        
      .then(res => {           
        Toast.clear(); 
        resolve(res.data);        
      })        
      .catch(err => {   
        Toast.clear();         
        reject(err.data)        
      })    
  });
}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, data) {  
  Toast.loading ({
    message: "加载中...",
    forbidClick: true,
    duration: 0,
    className: 'van-loading-custom',
  });   
  return new Promise((resolve, reject) => {         
      axios.post(url, QS.stringify(data))        
      .then(res => {  
        Toast.clear();             
        resolve(res.data);        
      })        
      .catch(err => {    
        Toast.clear();           
        reject(err.data)        
      })    
  });
}