# Quick Model Integration Guide

## 1. Place Your Model
Put your trained model in `ml-service/models/` directory:
- TensorFlow: `medicine_classifier.h5`
- PyTorch: `medicine_classifier.pth`

## 2. Update load_model() in main.py

### TensorFlow:
```python
def load_model():
    from tensorflow import keras
    model = keras.models.load_model('models/medicine_classifier.h5')
    return model
```

### PyTorch:
```python
def load_model():
    import torch
    model = torch.load('models/medicine_classifier.pth')
    model.eval()
    return model
```

## 3. Update predict_medicine() in main.py

Map your model's output classes to medicine IDs:
```python
class_to_medicine = {
    0: "paracetamol",
    1: "amoxicillin",
    2: "ibuprofen",
    # Add your classes
}
```

## 4. Test
```bash
python main.py
curl -X POST "http://localhost:8000/api/detect" -F "file=@test.jpg"
```
