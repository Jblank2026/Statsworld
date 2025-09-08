import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os

# Create directory if it doesn't exist
os.makedirs('public/images', exist_ok=True)

# Set the style to match UTK theme
plt.style.use('seaborn')
utk_orange = '#ff8200'
utk_smokey = '#58595b'

# 1. Scatterplot
np.random.seed(42)
x = np.random.normal(0, 1, 100)
y = 0.5 * x + np.random.normal(0, 0.5, 100)
plt.figure(figsize=(10, 6))
plt.scatter(x, y, color=utk_orange, alpha=0.6)
plt.xlabel('Variable X (Continuous)')
plt.ylabel('Variable Y (Continuous)')
plt.title('Scatterplot Example')
plt.grid(True, alpha=0.3)
plt.savefig('public/images/viz-1.jpg', bbox_inches='tight', dpi=300)
plt.close()

# 2. Histogram
data = np.random.normal(0, 1, 1000)
plt.figure(figsize=(10, 6))
plt.hist(data, bins=30, color=utk_orange, alpha=0.7, edgecolor=utk_smokey)
plt.xlabel('Values')
plt.ylabel('Frequency')
plt.title('Histogram Example')
plt.grid(True, alpha=0.3)
plt.savefig('public/images/viz-2.jpg', bbox_inches='tight', dpi=300)
plt.close()

# 3. Bar Chart
categories = ['A', 'B', 'C', 'D', 'E']
values = [23, 45, 56, 78, 32]
plt.figure(figsize=(10, 6))
plt.bar(categories, values, color=utk_orange)
plt.xlabel('Categories')
plt.ylabel('Values')
plt.title('Bar Chart Example')
plt.grid(True, alpha=0.3)
plt.savefig('public/images/viz-3.jpg', bbox_inches='tight', dpi=300)
plt.close()

# 4. Box Plot
data = [np.random.normal(0, std, 100) for std in [1, 2, 0.5, 1.5]]
plt.figure(figsize=(10, 6))
plt.boxplot(data, patch_artist=True, 
           boxprops=dict(facecolor=utk_orange, color=utk_smokey),
           medianprops=dict(color=utk_smokey))
plt.xlabel('Groups')
plt.ylabel('Values')
plt.title('Box Plot Example')
plt.grid(True, alpha=0.3)
plt.savefig('public/images/viz-4.jpg', bbox_inches='tight', dpi=300)
plt.close()

# 5. Line Plot
x = np.linspace(0, 10, 100)
y = np.sin(x)
plt.figure(figsize=(10, 6))
plt.plot(x, y, color=utk_orange, linewidth=2)
plt.xlabel('Time')
plt.ylabel('Value')
plt.title('Line Plot Example')
plt.grid(True, alpha=0.3)
plt.savefig('public/images/viz-5.jpg', bbox_inches='tight', dpi=300)
plt.close()

# 6. Violin Plot
data = [np.random.normal(0, std, 100) for std in [1, 2, 0.5, 1.5]]
plt.figure(figsize=(10, 6))
plt.violinplot(data)
plt.xlabel('Groups')
plt.ylabel('Values')
plt.title('Violin Plot Example')
plt.grid(True, alpha=0.3)
plt.savefig('public/images/viz-6.jpg', bbox_inches='tight', dpi=300)
plt.close()

print("Visualizations generated successfully!") 