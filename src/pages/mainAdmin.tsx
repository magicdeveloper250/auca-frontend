 

import { Link, Outlet } from "react-router-dom"
import { AppSidebar } from "../components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb"
import { Separator } from "../components/ui/separator"
import {
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "../components/ui/sidebar"
import { ChevronDown, LogOut, Settings, User, User2Icon } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Button } from "../components/ui/button"
import { jwtDecode } from "jwt-decode"
import useAuth from "../hooks/useAuth"
import { useEffect, useState } from "react"
import useToast from "../hooks/useToast"

import { useNavigate } from "react-router-dom"

 export interface DecodedToken{
  
email: string
exp:number
iat: number
jti:  string
role: string
token_type: string
user_id: number
 }

 function maskEmail(email: string ): string {
  if(email.length<=0)
    return ""
  const [user, domain] = email.split("@");
  const maskedUser =
    user.length <= 2
      ? "*".repeat(user.length)
      : user[0] + "*".repeat(user.length - 2) + user[user.length - 1];

  const [domainName, domainExt] = domain.split(".");
  const maskedDomain =
    domainName[0] + "*".repeat(domainName.length - 1) + "." + domainExt;

  return `${maskedUser}@${maskedDomain}`;
}

export default function MainPage() {
  const {parentUrl, url} = useSidebar();
  const {auth }= useAuth()
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null)
  const navigate= useNavigate()
  const {setToastMessage}= useToast()
  


  useEffect(()=>{

    try {
      const decoded= jwtDecode<DecodedToken>(auth)
      setDecodedToken(decoded)
    } catch (error) {
      setToastMessage({
        message:"Error of validating access token. Please login again.",
        variant:"danger"
      })
      navigate("/login")
      
      
      
    }
  },[auth])
  
 
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="#">
              {parentUrl}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>{url}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
       
      
      <div className="flex-1"></div>
      
      {/* <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-gray-100 focus:outline-none">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
              <User className="size-4" />
            </div>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-gray-500">john@example.com</span>
            </div>
            <ChevronDown className="size-4 text-gray-500" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="flex items-center gap-2 p-2 md:hidden">
            <span className="font-medium">John Doe</span>
            <span className="text-xs text-gray-500">john@example.com</span>
          </div>
          <DropdownMenuSeparator className="md:hidden" />
          <DropdownMenuItem>
            <User className="mr-2 size-4" />
            <span>My Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 size-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 size-4" />
            <Link to={"/logout"}>Log out</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}

      <DropdownMenu>
      <DropdownMenuTrigger asChild>
       <Button variant="outline" className="p-4">
       <User2Icon/> {decodedToken?.role.toLocaleUpperCase()}
       </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator className="md:hidden" />
         
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 size-4" />
            <span>My Profile ({maskEmail(decodedToken?.email.toLocaleLowerCase() || "")})</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 size-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 size-4" />
            <Link to={"/logout"}>Log out</Link>
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
          <Outlet />
        </div>
      </SidebarInset>
    </>
  )
}
