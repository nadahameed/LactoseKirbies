import pygame
import random

# Initialize Pygame
pygame.init()

# Set up the game window
window_width = 800
window_height = 400
window = pygame.display.set_mode((window_width, window_height))
pygame.display.set_caption("Dino Game")

# Colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)

# Dinosaur class
class Dinosaur(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((50, 50))
        self.image.fill(WHITE)
        self.rect = self.image.get_rect()
        self.rect.center = (100, window_height - 50)
        self.is_jumping = False
        self.jump_count = 10
    
    def update(self):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_SPACE] and not self.is_jumping:
            self.is_jumping = True
        if self.is_jumping:
            if self.jump_count >= -10:
                neg = 1
                if self.jump_count < 0:
                    neg = -1
                self.rect.y -= (self.jump_count ** 2) * 0.5 * neg
                # self.rect.x += (self.jump_count ** 2) * 0.5 * neg
                self.jump_count -= 1
            else:
                self.is_jumping = False
                self.jump_count = 10
    
    def draw(self, surface):
        surface.blit(self.image, self.rect)

# Obstacle class
class Obstacle(pygame.sprite.Sprite):
    def __init__(self, x, y, width, height, speed):
        super().__init__()
        self.image = pygame.Surface((width, height))
        self.image.fill(WHITE)
        self.rect = self.image.get_rect()
        self.rect.center = (x, y)
        self.speed = speed
    
    def update(self):
        self.rect.x -= self.speed
    
    def draw(self, surface):
        surface.blit(self.image, self.rect)

# Group for all sprites
all_sprites = pygame.sprite.Group()

# Create dinosaur and add it to the group
dino = Dinosaur()
all_sprites.add(dino)

# Create obstacles and add them to the group
obstacles = pygame.sprite.Group()

def create_obstacle():
    x = window_width
    y = window_height - 50
    width = 30
    height = random.randint(20, 80)
    speed = 5
    obstacle = Obstacle(x, y, width, height, speed)
    obstacles.add(obstacle)
    all_sprites.add(obstacle)

# Game loop
running = True
clock = pygame.time.Clock()
obstacle_timer = 0
obstacle_interval = 200  # milliseconds
while running:
    clock.tick(60)

    # Event handling
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    
    # Update
    all_sprites.update()

    # Generate obstacles
    obstacle_timer += clock.get_rawtime()
    if obstacle_timer >= obstacle_interval:
        create_obstacle()
        obstacle_timer = 0

    # Collision detection
    if pygame.sprite.spritecollide(dino, obstacles, False):
        print("Game Over")
        running = False
    
    # Render
    window.fill(BLACK)
    all_sprites.draw(window)
    pygame.display.flip()

# Quit the game
pygame.quit()
