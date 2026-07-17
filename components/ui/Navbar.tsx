import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const Navbar = () => {
  return (
    <header>
        <nav>
                {/* Use Link for navigation links instead of void <link> or HTML anchor elements */}
                <Link className="logo" href="/">
                    <Image src="/icons/logo.png" alt="logo" width={24} height={24}/>
                    <p>DevEvent</p>
                </Link>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/events">Events</Link></li>
                    <li><Link href="/events/create">Create Event</Link></li>
                </ul>
            </nav>
    </header>
  )
}

export default Navbar