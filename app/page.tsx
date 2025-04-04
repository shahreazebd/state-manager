import { UserJotai } from "@/components/user-jotai";
import { UserStanjs } from "@/components/user-stanjs";

export default function Home() {
  return (
    <div>
      <h1>User Page</h1>
      <p>This is the user page.</p>
      <UserJotai />
      <UserStanjs />
    </div>
  );
}
