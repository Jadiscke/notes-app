
-- Note: This table contains notes data. Users should only be able to view and update their own data.
create table notes (
  id uuid not null default uuid_generate_v4() primary key,
  user_id uuid not null,
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint "notes_users_id_fkey" foreign key ("user_id")
        references  next_auth.users (id) match simple
        on update no action
        on delete cascade -- if a user is deleted in NextAuth they will also delete their notes.
);
alter table notes enable row level security;
create policy "Can view own user data." on notes for select using (next_auth.uid() = user_id);
create policy "Can update own user data." on notes for update using (next_auth.uid() = user_id) with check ( (select next_auth.uid()) = user_id);
create policy "Can delete own user data." on notes for delete using (next_auth.uid() = user_id);
create policy "Can insert own user data." on notes for insert with check ( (select next_auth.uid()) = user_id);

