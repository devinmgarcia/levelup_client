import React from "react";
import { Route } from "react-router-dom";
import { EventForm } from "./event/EventForm.js";
import { EventList } from "./event/EventLIst.js";
import { EventProvider } from "./event/EventProvider.js";
import { GameForm } from "./game/GameForm.js";
import { GameList } from "./game/GameList.js";
import { GameProvider } from "./game/GameProvider.js";
import { Profile } from "./profile/Profile.js";
import { ProfileProvider } from "./profile/ProfileProvider.js";

export const ApplicationViews = () => {
  return (
    <>
      <main
        style={{
          margin: "5rem 2rem",
          lineHeight: "1.75rem",
        }}
      >
        <ProfileProvider>
          <GameProvider>
            <EventProvider>
              <Route exact path="/">
                <GameList />
              </Route>
              <Route exact path="/games">
                <GameList />
              </Route>
              <Route exact path="/games/new">
                <GameForm />
              </Route>
              <Route exact path="/events">
                <EventList />
              </Route>
              <Route exact path="/events/new">
                <EventForm />
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
            </EventProvider>
          </GameProvider>
        </ProfileProvider>
      </main>
    </>
  );
};
