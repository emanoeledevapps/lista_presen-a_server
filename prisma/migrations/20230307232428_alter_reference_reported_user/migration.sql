-- DropForeignKey
ALTER TABLE "Delation" DROP CONSTRAINT "Delation_reportedUser_fkey";

-- AddForeignKey
ALTER TABLE "Delation" ADD CONSTRAINT "Delation_reportedUser_fkey" FOREIGN KEY ("reportedUser") REFERENCES "User"("wallet") ON DELETE RESTRICT ON UPDATE CASCADE;
