import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
data = {
    'Launch_Distance': [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    'Launch_Angle': [15, 30, 45, 60, 75, 90, 105, 120, 135, 150]
}
df = pd.DataFrame(data)
X = df[['Launch_Distance']]
y = df['Launch_Angle']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f'Mean Squared Error: {mse}')
new_distance = np.array([[48]])
predicted_angle = model.predict(new_distance)
print(f'Predicted Launch Angle for 48 meters: {predicted_angle[0]}')

print(f'Coefficient: {model.coef_[0]}')
print(f'Intercept: {model.intercept_}')