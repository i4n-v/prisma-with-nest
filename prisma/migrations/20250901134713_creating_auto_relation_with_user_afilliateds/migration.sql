-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "afilliated_id" UUID;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_afilliated_id_fkey" FOREIGN KEY ("afilliated_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
