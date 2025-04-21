import { useEffect, useState } from 'react';
import { social } from '../data/socials';
import DevTreeInput from '../components/DevTreeInput';
import { validUrl } from '../utils';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '../api/DevTreeAPI';
import { User } from '../types';
import { SocialNetwork } from '../types/index';

export const LinkTreeView = () => {
  
  const [devTreeLinks, setDevTreeLinks] = useState(social)

  const queryClient = useQueryClient();

  const user: User = queryClient.getQueryData(['user'])!;
    
  const { mutate } = useMutation({

    mutationFn: updateProfile,
    onError: (error) => {
       toast.error(error.message)
    },
    onSuccess: () => {
      toast.success('Profile updated')
      
    }
  })

  useEffect(() => {
    const updateData = devTreeLinks.map(item => {
      const userlink = JSON.parse(user.links).find((link: SocialNetwork) => link.name === item.name);
      if(userlink) {
        return {...item, url: userlink.url, enabled: userlink.enabled}
      }
      return item;
    })
    setDevTreeLinks(updateData);

  },[])

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const updatedLinks = devTreeLinks.map(link => link.name === e.target.name ? { ...link, url: e.target.value } : link)

    setDevTreeLinks(updatedLinks);

    queryClient.setQueryData(['user'], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedLinks)
      }
    })

  }

  const handleEnableLink = (socialNetwork: string) => {

    const updatedLinks = devTreeLinks.map(link => {

      if (link.name === socialNetwork) {
        if (validUrl(link.url)) {
          return { ...link, enabled: !link.enabled }
        } else {
          toast.error('Please enter a valid URL');
        }
      }
      return link;
    })

    setDevTreeLinks(updatedLinks);

    queryClient.setQueryData(['user'], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedLinks)
      }
    })

  }

  return (
    <>
      <div className='space-y-5'>
        {devTreeLinks.map(item => (
          <DevTreeInput
            key={item.name}
            item={item}
            handleUrlChange={handleUrlChange}
            handleEnableLink={handleEnableLink}
          />
        ))}

        <button
        className='bg-cyan-400 p-2 test-lg w-full uppercase text-slate-600 rounded font-bold'
        onClick={() => mutate(user)}
        >Save Changes</button>
      </div>
    </>

  )
}
