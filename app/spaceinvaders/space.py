import pygame
import random

# Initialize Pygame
pygame.init()

# Game window dimensions
window_width = 800
window_height = 600

# Define colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)

# Create the game window
window = pygame.display.set_mode((window_width, window_height))
pygame.display.set_caption("Space Invaders")

# Load player image
player_image = pygame.transform.scale(pygame.image.load("data/kirby.png"),(50,50))
player_rect = player_image.get_rect()
player_rect.centerx = window_width // 2
player_rect.bottom = window_height - 10

# Load projectile image
projectile_image = pygame.transform.scale(pygame.image.load("data/projectile.png"),(30,30))

# Player properties
projectile_width = 10
projectile_height = 10
projectile_speed = 5
projectile_cooldown = 20  # Cooldown between shots
projectile_timer = 0  # Timer for cooldown
projectiles = []

# Load enemy image
enemy_image = pygame.transform.scale(pygame.image.load("data/enemy.png"),(40,40))

# Enemy properties
enemy_width = 50
enemy_height = 50
enemy_speed = 2

# Create enemies
num_enemies = 5
enemies = []
for i in range(num_enemies):
    enemy = {
        'image': enemy_image,
        'rect': pygame.Rect(random.randint(0, window_width - enemy_width), random.randint(-200, -enemy_height), enemy_width, enemy_height),
        'speed': enemy_speed
    }
    enemies.append(enemy)

# Initialize score
score = 0

# Initialize game over flag
game_over = False

# Initialize play again flag
play_again = False

# Game loop
running = True
clock = pygame.time.Clock()

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    if not game_over:
        # Player movement
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:
            player_rect.x -= 5
            if player_rect.left < 0:
                player_rect.left = 0
        if keys[pygame.K_RIGHT]:
            player_rect.x += 5
            if player_rect.right > window_width:
                player_rect.right = window_width

        # Shoot projectiles
        if keys[pygame.K_SPACE] and projectile_timer <= 0:
            projectile = {
                'rect': pygame.Rect(player_rect.centerx - projectile_width // 2, player_rect.top - projectile_height, projectile_width, projectile_height),
                'speed': projectile_speed
            }
            projectiles.append(projectile)
            projectile_timer = projectile_cooldown  # Set cooldown timer

        # Update projectile positions
        for projectile in projectiles:
            projectile['rect'].y -= projectile['speed']

            # Remove projectiles that go off-screen
            if projectile['rect'].y < 0:
                projectiles.remove(projectile)

        # Update enemy positions
        for enemy in enemies:
            enemy['rect'].y += enemy['speed']

            # Check for collision with projectiles
            for projectile in projectiles:
                if enemy['rect'].colliderect(projectile['rect']):
                    score += 1
                    projectiles.remove(projectile)
                    enemy['rect'].y = random.randint(-200, -enemy_height)
                    enemy['rect'].x = random.randint(0, window_width - enemy_width)

            # Check for collision with player
            if enemy['rect'].colliderect(player_rect):
                game_over = True

            # Check if enemy reaches the bottom
            if enemy['rect'].y > window_height:
                enemy['rect'].y = random.randint(-200, -enemy_height)
                enemy['rect'].x = random.randint(0, window_width - enemy_width)

        # Fill the window with background color
        window.fill(BLACK)

        # Draw the player
        window.blit(player_image, player_rect)

        # Draw the projectiles
        for projectile in projectiles:
            window.blit(projectile_image, projectile['rect'])

        # Draw the enemies
        for enemy in enemies:
            window.blit(enemy['image'], enemy['rect'])

        # Draw the score
        font = pygame.font.Font(None, 36)
        score_text = font.render("Score: " + str(score), True, WHITE)
        window.blit(score_text, (10, 10))

        # Decrease projectile timer
        if projectile_timer > 0:
            projectile_timer -= 1
    else:
        # Game over screen
        font = pygame.font.Font(None, 72)
        game_over_text = font.render("Game Over", True, WHITE)
        window.blit(game_over_text, (window_width // 2 - game_over_text.get_width() // 2, window_height // 2 - game_over_text.get_height() // 2))

        # Play again prompt
        prompt_text = font.render("Press 'P' to play again", True, WHITE)
        window.blit(prompt_text, (window_width // 2 - prompt_text.get_width() // 2, window_height // 2 + prompt_text.get_height() // 2))

        # Check for play again input
        keys = pygame.key.get_pressed()
        if keys[pygame.K_p]:
            # Reset game state
            score = 0
            projectiles.clear()
            for enemy in enemies:
                enemy['rect'].y = random.randint(-200, -enemy_height)
                enemy['rect'].x = random.randint(0, window_width - enemy_width)

            game_over = False

    pygame.display.flip()
    clock.tick(60)

# Quit the game
pygame.quit()
