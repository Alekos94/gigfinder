import React, { useContext } from "react";
import Navbar from "../../components/navbar/navbar";
import { FavouritesContext } from "../../context/favourites-context";
import { FavouritesList } from "../../components/favourites-list/favourites-list";
import '../events-list-page/events-list-page.css';

function FavouritesPage() {
  const context = useContext(FavouritesContext);

  if (!context) {
    return null;
  }

  const { favourites } = context;

  return (
    <div className="page">
      <Navbar />
        <div>
          {favourites.length > 0 ?
          <div className="favourite-events">
            <h2>YOUR FAVOURITE EVENTS</h2>
            <FavouritesList events={favourites}/>
          </div>
          : <h2>No favourites added yet.. </h2>
        }

        </div>
    </div>
  );
}

export default FavouritesPage;