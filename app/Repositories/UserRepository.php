<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\User;

class UserRepository implements UserRepositoryInterface
{
    protected User $user;

    /**
     * Class construction method
     * @param User $user User Repository
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Gets all users
     */
    public function getAll()
    {
        $user = $this->user->with(['leaderGroups', 'activities'])->all();
        return $user;
    }

    /**
     * Find specified user
     * @param int $id user ID
     */
    public function find(int $id)
    {
        $user = $this->user->with(['leaderGroups', 'activities', 'participants'])->find($id);
        return $user;
    }

    /**
     * Deletes specified user
     * @param int $id user ID
     */
    public function delete(int $id): bool
    {
        $user = $this->user->destroy($id);

        if (!$user) {
            return false;
        }

        return true;
    }

    /**
     * Create user record
     * @param array $data
     */
    public function create(array $data)
    {
        return $this->user->create($data);
    }

    /**
     * Updates specified user
     * @param array $data Values
     * @param int $id user ID
     */
    public function update(array $data, int $id)
    {
        return $this->user->update($data, ['id' => $id]);
    }
}
