# Web Development Project 7 - *Party Forge*

Submitted by: **Jaime Nunez**

This web app: **Party Forge is a Dungeons & Dragons party builder. Users can
recruit adventurers by choosing a class, which unlocks class-specific
specializations, then set their level and alignment. The party gallery shows
summary statistics and a dynamic "Quest Success" rating that changes the look
of the crew list. Full CRUD is powered by Supabase.**

Time spent: **3** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The web app contains a page that features a create form to add a new crewmate**
  - Users can name the crewmate
  - Users can set the crewmate’s attributes by clicking on one of several values
- [x] **The web app includes a summary page of all the user’s added crewmatese**
  -  The web app contains a summary page dedicated to displaying all the crewmates the user has made so far
  -  The summary page is sorted by creation date such that the most recently created crewmates appear at the top
- [x] **A previously created crewmate can be updated from the list of crewmates in the summary page**
  - Each crewmate has an edit button that will take users to an update form for the relevant crewmate
  - Users can see the current attributes of their crewmate on the update form
  - After editing the crewmate's attribute values using the form, the user can immediately see those changes reflected in the update form and on the summary page
- [x] **A previously created crewmate can be deleted from the crewmate list**
  - Using the edit form detailed in the previous _crewmates can be updated_ feature, there is a button that allows users to delete that crewmate
  - After deleting a crewmate, the crewmate should no longer be visible in the summary page
- [x] **Each crewmate has a direct, unique URL link to an info page about them**
    - Clicking on a crewmate in the summary page navigates to a detail page for that crewmate
    - The detail page contains extra information about the crewmate not included in the summary page
    - Users can navigate to to the edit form from the detail page

The following **optional** features are implemented:

- [x] A crewmate can be given a category upon creation which restricts their attribute value options
  - User can choose a `category` (D&D class) option to describe their crewmate before any attributes are specified
  - Based on the category value, users are allowed to access only a subset of the possible attributes (class-specific specializations)
- [x] A section of the summary page, displays summary statistics about a user’s crew on their crew page
  - Shows total members, average level, % spellcasters, unique classes, and whether the party has a healer
- [x] The summary page displays a custom “success” metric about a user’s crew which changes the look of the crewmate list
  - A "Quest Success" rating (Doomed → Risky → Heroic → Legendary) computed from party size, average level, class diversity, and healer presence; the banner and list styling change by tier

The following **additional** features are implemented:

* [x] Fully themed fantasy UI with class icons and class-colored cards
* [x] Delete confirmation dialog to prevent accidental removals
* [x] Empty-state prompt on the gallery when no crewmates exist
* [x] Animated success bar reflecting the party's quest success percentage

## Video Walkthrough

Here's a walkthrough of implemented user stories:

[▶️ Watch the Video Walkthrough on Loom](https://www.loom.com/share/471b98801bc34a34a4357362dc1f3cec)

Video created with Loom.

## Notes

Describe any challenges encountered while building the app.

The main challenge was implementing the category-restricts-attributes feature cleanly. When a user changes the selected class, the previously chosen specialization must be reset since it may no longer be valid. I solved this by resetting `specialization` to an empty string inside the class-select handler. Designing a meaningful "Quest Success" formula that felt fair across different
party compositions also took some tuning. I also had an issue where the party page wouldn't load properly if the party was empty. This was due to the database URL in the .env file being the incorrect URL. After this was fixed by using AI to determine what specific URL I needed to be entering there I was able to get the page to load without issue with or without a party.

## License

    Copyright 2026 Jaime Nunez

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.