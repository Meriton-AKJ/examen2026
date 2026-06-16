-- AlterTable
ALTER TABLE `Task` MODIFY `status` ENUM('todo', 'pending', 'done', 'cancelled') NOT NULL DEFAULT 'pending';
