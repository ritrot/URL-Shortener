import React, { useState, useEffect } from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Filter } from 'lucide-react'
import UseFetch from "../hooks/UseFetch";
import { UrlState } from '../Contextapi';
import { getUrls } from '../db/apiUrls';
import { getClicks } from '../db/apiClicks';
import { Input } from "../components/ui/input";
import LinkCard from '../components/LinkCard';
const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const { user } = UrlState();
  const { data: urls, error, loading, fn: fnUrls } = UseFetch(getUrls, user.id);
  const { data: clicks, error: clicksError, loading: clicksLoading, fn: fnClicks } = UseFetch(
    getClicks,
    urls?.map?.((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
    console.log(urls?.length);

  }, [])

  useEffect(() => {
    if (urls?.length) {
      fnClicks();
    }
  }, [urls?.length])

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='grid gap-10 mt-10'>
      <div className='grid grid-cols-2 gap-8'>
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className='flex justify-between'>
        <h1 className='text-4xl font-extrabold'>Links</h1>
        <Button>Create</Button>
      </div>

      <div className='relative'>
        <Input
          type="text"
          placeholder="Search Links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className=' absolute top-2 right-2 p-1' />
      </div>

      {(filteredUrls || []).map((url, i) => (
        <LinkCard key={i} url={url} fetchUrls={fnUrls} />
      ))}
    </div>

  )
}

export default Dashboard
