import pygame
import random
# from app.db.sql import *

# Initialize pygame
pygame.init()

# Set up the game window
WIDTH = 610
HEIGHT = 600
win = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Pong Game")

background_image = pygame.image.load("data/background.png")
background_rect = background_image.get_rect()

# Define colors
WHITE = (255, 255, 255)
YELLOW = (254, 245, 164)
RED = (236, 123, 125)

# Set up the game clock
clock = pygame.time.Clock()

# Set up the paddle
paddle_width = 100
paddle_height = 20
paddle_x = (WIDTH - paddle_width) // 2
paddle_y = HEIGHT - paddle_height
paddle_speed = 5

ball_image = pygame.transform.scale(pygame.image.load("data/kirbyball.png"),(40,40))  # Replace with the path to your ball image
ball_radius = 10
# Set up the ball
ball_rect = ball_image.get_rect()
ball_rect.center = (WIDTH // 2, HEIGHT // 2)
ball_dx = random.choice([-2, 2])
ball_dy = -2

# Set up blocks
block_width = 50
block_height = 20
block_rows = 5
block_cols = 10
block_margin = 10
blocks = []
for row in range(block_rows):
    for col in range(block_cols):
        block_x = col * (block_width + block_margin) + block_margin
        block_y = row * (block_height + block_margin) + block_margin
        blocks.append(pygame.Rect(block_x, block_y, block_width, block_height))

score = 0

# Game loop
running = True
while running:
    # Handle events
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    win.blit(background_image, background_rect)

    # Move the paddle
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT] and paddle_x > 0:
        paddle_x -= paddle_speed
    if keys[pygame.K_RIGHT] and paddle_x < WIDTH - paddle_width:
        paddle_x += paddle_speed

    # Move the ball
    ball_rect.x += ball_dx
    ball_rect.y += ball_dy

    # Check ball collision with paddle
    if ball_rect.y + ball_radius > paddle_y and ball_rect.x + ball_radius > paddle_x and ball_rect.x - ball_radius < paddle_x + paddle_width:
        ball_dy = -ball_dy

    # Check ball collision with blocks
    for block in blocks:
        if block.collidepoint(ball_rect.x, ball_rect.y):
            blocks.remove(block)
            score += 1
            ball_dy = -ball_dy
            break

    # Check ball collision with walls
    if ball_rect.x - ball_radius < 0 or ball_rect.x + ball_radius > WIDTH:
        ball_dx = -ball_dx
    if ball_rect.y - ball_radius < 0:
        ball_dy = -ball_dy
    elif ball_rect.y + ball_radius > HEIGHT:
        running = False  # Game over if ball hits the bottom

    # Clear the screen
    #win.fill(WHITE)

    # Draw the paddle
    pygame.draw.rect(win, RED, (paddle_x, paddle_y, paddle_width, paddle_height))

    # Draw the ball
    win.blit(ball_image, ball_rect)

    # Draw the blocks
    for block in blocks:
        pygame.draw.rect(win, YELLOW, block)

    # Display the score
    font = pygame.font.Font(None,36)
    text = font.render("Score: " + str(score), True, YELLOW)
    win.blit(text, (WIDTH-110, HEIGHT - 40))

    # Update the display
    pygame.display.update()

    # Limit the frame rate
    clock.tick(60)

# Quit the game

def add_score(user, game, score):
  c = db.cursor()
  c.execute("select game from users where (user=?)")
  newScore = float(c.fetchone())
  newScore += score
  c.execute("REPLACE INTO table(game) where username=user VALUES(score)")
  db.commit()
  c.close()

session_user = F"{get_username(session['ID'])}"
add_score(session_user, "pong_high", score)
pygame.quit()
