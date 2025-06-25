import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/UseFetch';
import { getLongUrl } from '../db/apiUrls';
import { storeClicks } from '../db/apiClicks';
import Loading from '../components/Loading';

const RedirectLink = () => {
  const {id} = useParams();

  const {data , error , loading , fn} = useFetch(getLongUrl , id);

  const {error:urlError , loading:urlLoading , fn:fnClick} = useFetch(storeClicks , {id:data?.id , originalUrl: data?.original_url});

  useEffect(()=>{
    fn();
  } ,[])

  useEffect(()=>{
    if(data  && !loading){
      fnClick();

    }
  } , [data ,loading ])

  if(loading , urlLoading){
    return <Loading/>
  }

  return null
}

export default RedirectLink
