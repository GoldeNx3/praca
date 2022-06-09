<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
  |--------------------------------------------------------------------------
  | API Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register API routes for your application. These
  | routes are loaded by the RouteServiceProvider within a group which
  | is assigned the "api" middleware group. Enjoy building your API!
  |
 */

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/sanctum/token', \App\Http\Controllers\TokenController::class);

/** TRAVEL */
Route::get('/posts', [App\Http\Controllers\Travel\PostController::class, 'index']);
Route::get('/posts/{post}/show', [App\Http\Controllers\Travel\PostController::class, 'show']);
Route::get('/posts/get', [App\Http\Controllers\Travel\PostController::class, 'getAll']);
/** TRAVEL */


Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('admin/posts', App\Http\Controllers\Admin\PostController::class);
    Route::post('/admin/posts/{post}', [App\Http\Controllers\Admin\PostController::class, 'update']);
});

Route::get('/template/dashboard', [App\Http\Controllers\Admin\TemplateController::class, 'dashboard']);
