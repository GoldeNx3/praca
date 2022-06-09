<?php

declare(strict_types=1);

namespace App\Repositories;

/**
 * Interface for PostRepository
 */
interface PostRepositoryInterface
{
    public function getAll();
    public function find(int $id);
    public function delete(int $id): bool;
    public function create(array $data);
    public function update(array $data, int $id);
}
