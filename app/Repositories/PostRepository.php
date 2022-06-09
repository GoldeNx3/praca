<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Post;

class PostRepository implements PostRepositoryInterface
{
    protected Post $post;

    /**
     * Class construction method
     * @param Post $post Post Repository
     */
    public function __construct(Post $post)
    {
        $this->post = $post;
    }

    /**
     * Gets all posts
     */
    public function getAll()
    {
        $post = $this->post->all();
        return $post;
    }

    /**
     * Find specified post
     * @param int $id Post ID
     */
    public function find(int $id)
    {
        $post = $this->post->find($id);
        return $post;
    }

    /**
     * Deletes specified post
     * @param int $id Post ID
     */
    public function delete(int $id): bool
    {
        $post = $this->post->destroy($id);

        if (!$post) {
            return false;
        }

        return true;
    }

    /**
     * Create post record
     * @param array $data
     */
    public function create(array $data)
    {
        return $this->post->create($data);
    }

    /**
     * Updates specified post
     * @param array $data Values
     * @param int $id Post ID
     */
    public function update(array $data, int $id)
    {
        return $this->post->update($data, ['id' => $id]);
    }
}
