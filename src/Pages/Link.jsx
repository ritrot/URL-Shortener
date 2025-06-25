import React, { useEffect } from 'react'
import { UrlState } from '../Contextapi';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../hooks/UseFetch';
import Loading from '../components/Loading';
import { getUrl, deleteUrl } from '../db/apiUrls';
import { getClicksForUrl } from '../db/apiClicks';
import DeviceStats from '../components/DeviceStats';
import LocationStats from '../components/LocationStats';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
const LinkPage = () => {
  const { user } = UrlState();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: url, error, loading, fn: urlFn } = useFetch(getUrl, { id, user_id: user.id });
  const { data: click, loading: clickLoading, error: clicksError, fn: clickFn } = useFetch(getClicksForUrl, id);
  const { error: deleteError, loading: loadingDelete, fn: deleteFn } = useFetch(deleteUrl, id)

  useEffect(() => {
    urlFn();
  }, [id, user.id])

  useEffect(() => {
    if (!error, loading === false) {
      clickFn();
    }
  }, [error, loading])

  if (error) {
    navigate("/dashboard");
  }



  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    // Create an anchor element
    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    // Append the anchor to the body
    document.body.appendChild(anchor);

    // Trigger the download by simulating a click event
    anchor.click();

    // Remove the anchor from the document
    document.body.removeChild(anchor);
  };

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }

  if (loading || clickLoading) {
    return <Loading />
  }
  return (
    <div className="flex flex-col gap-8 sm:flex-row justify-between">
      <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
        <span className="text-6xl font-extrabold hover:underline cursor-pointer">
          {url?.title}
        </span>
        <a
          href={`http://localhost:5173/${link}`}
          target="_blank"
          className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
        >
          http://localhost:5173/{link}
        </a>
        <a
          href={url?.original_url}
          target="_blank"
          className="flex items-center gap-1 hover:underline cursor-pointer"
        >
          <LinkIcon className="p-1" />
          {url?.original_url}
        </a>
        <span className="flex items-end font-extralight text-sm">
          {new Date(url?.created_at).toLocaleString()}
        </span>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() =>
              navigator.clipboard.writeText(`https://trimrr.in/${link}`)
            }
          >
            <Copy />
          </Button>
          <Button variant="ghost" onClick={downloadImage}>
            <Download />
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              deleteFn().then(() => {
                navigate("/dashboard");
              })
            }
            disable={loadingDelete}

          >
            <Trash />
          </Button>
        </div>
        <img
          src={url?.qr}
          className="w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain"
          alt="qr code"
        />
      </div>

      <div className='sm:w-1/2 flex flex-col gap-8'>
        <Card>
          <CardHeader>
            <CardTitle className = "text-4xl font-bold">Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-10'>
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{click?.length || 0}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Divice</CardTitle>
                </CardHeader>
                <DeviceStats click={click} />
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <LocationStats click={click} />
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>


  )
}

export default LinkPage
