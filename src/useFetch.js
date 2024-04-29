import {useState, useEffect} from 'react';

const useFetch = (url) => {
    const[data, setData]=useState(null);
    const[isLoading, setisLoading]=useState(true);
    const[isError, setisError]=useState(null);

    useEffect(()=>{
        const abortCont=new AbortController();
        setTimeout(()=>{
          fetch(url, {signal:abortCont.signal})
          .then(res=>{
            if(!res.ok){
              throw Error("Couldn't fetch the data from given resource");
            }
           return res.json();
          })
          .then((data)=>{
            setData(data);
            setisLoading(false);
            setisError(null);
          })
          .catch(err=>{
            if(err.name==='AbortError'){
                console.log('fetch aborted');
            } else{
            setisLoading(false);
            setisError(err.message);
            }
          })
        }, 1000);

        return ()=>abortCont.abort();
      },[url]);

      return {data, isLoading, isError}
}
export default useFetch;