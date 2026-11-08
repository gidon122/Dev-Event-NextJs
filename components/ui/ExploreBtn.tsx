"use client"
import { ChevronDown } from "lucide-react";

const ExploreBtn = () => {
  return (
    <button type="button"
    id="explore-btn"
    className="mt-7 mx-auto">
      <a href="#events">
        Explore Events
        <ChevronDown aria-hidden="true" size={24} />
      </a>
      </button>
  )
}

export default ExploreBtn