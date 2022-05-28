import React,{useEffect} from 'react'

const index = ({data}) => {
  useEffect(() => {
  console.log(data);
    return () => {
    }
  }, [])
  
  return (
    <div>{data?.slug}</div>
  )
}

export default index;
export async function getServerSideProps(context){
  const slug = context.params
  return{
    props:{
      data:slug
    }
  }
}