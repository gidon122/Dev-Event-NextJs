import React from 'react'
import Image from 'next/image'
const Navbar = () => {
  return (
    <header>
        <nav>
                {/* Use <a> for navigation links instead of void <link> element */}
                <a className="logo" href="/">
                    <Image src="/icons/logo.png" alt="logo" width={24} height={24}/>
                    <p>DevEvent</p>
                </a>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/events">Events</a></li>
                    <li><a href="/create">Create Event</a></li>
                </ul>
            </nav>
    </header>
  )
}

export default Navbar