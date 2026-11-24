CREATE TABLE "visits" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"visited_at" timestamp with time zone DEFAULT now() NOT NULL
);
