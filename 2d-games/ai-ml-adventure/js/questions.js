/**
 * Neural Navigator - AI/ML Questions Database
 * 10 Levels × 3 Sections × 8-9 Questions
 */

const GAME_QUESTIONS = {
  // Level 1: Neural Network Basics
  1: {
    name: "Neural Foundations",
    sections: {
      basic: [
        {
          question: "What is the basic unit of a neural network?",
          options: ["Neuron", "Synapse", "Layer", "Node"],
          correct: 0,
          hint: "Like biological brains, artificial networks use these as building blocks",
          nextHint: "It's the computational unit that receives inputs and produces output"
        },
        {
          question: "What function introduces non-linearity in neural networks?",
          options: ["Linear function", "Activation function", "Loss function", "Cost function"],
          correct: 1,
          hint: "It determines whether a neuron should be activated or not",
          nextHint: "ReLU, Sigmoid, and Tanh are examples of this"
        },
        {
          question: "What is the input layer's role in a neural network?",
          options: ["Process data", "Receive raw data", "Make predictions", "Calculate errors"],
          correct: 1,
          hint: "It's where the data first enters the network",
          nextHint: "It passes the raw features to the next layer without processing"
        },
        {
          question: "What does the output layer produce?",
          options: ["Hidden features", "Final predictions", "Weight updates", "Gradients"],
          correct: 1,
          hint: "This is what the network predicts or classifies",
          nextHint: "For classification, it might output probabilities for each class"
        },
        {
          question: "What are weights in a neural network?",
          options: ["Random numbers", "Learned parameters", "Fixed values", "Bias terms"],
          correct: 1,
          hint: "These are adjusted during training to minimize error",
          nextHint: "They determine the importance of each input to the neuron"
        },
        {
          question: "What is bias in a neural network?",
          options: ["Error in prediction", "Offset added to activation", "Data imbalance", "Model prejudice"],
          correct: 1,
          hint: "It allows the activation function to be shifted",
          nextHint: "Like y = mx + b, the bias is the 'b' that shifts the line"
        },
        {
          question: "What is forward propagation?",
          options: ["Updating weights", "Calculating output from input", "Going backwards", "Data cleaning"],
          correct: 1,
          hint: "Input flows through the network to produce output",
          nextHint: "It's the process of passing data from input to output layer"
        },
        {
          question: "What is a common activation function?",
          options: ["Linear", "ReLU", "Constant", "Random"],
          correct: 1,
          hint: "Rectified Linear Unit - outputs 0 for negative, input for positive",
          nextHint: "max(0, x) - simple but very effective"
        }
      ],
      intermediate: [
        {
          question: "What is backpropagation?",
          options: ["Forward pass", "Calculating gradients", "Data augmentation", "Model deployment"],
          correct: 1,
          hint: "It's how the network learns from its mistakes by going backwards",
          nextHint: "It calculates how much each weight contributed to the error"
        },
        {
          question: "What is the learning rate?",
          options: ["Speed of prediction", "Step size for weight updates", "Training time", "Model complexity"],
          correct: 1,
          hint: "Controls how quickly the model adapts to the problem",
          nextHint: "Too high = unstable, too low = slow learning"
        },
        {
          question: "What is gradient descent?",
          options: ["Random search", "Climbing uphill", "Minimizing loss", "Increasing accuracy"],
          correct: 2,
          hint: "Going downhill to find the lowest point of the loss function",
          nextHint: "Follows the negative gradient to minimize the loss"
        },
        {
          question: "What is the vanishing gradient problem?",
          options: ["Gradients too large", "Gradients become very small", "No gradients", "Fast learning"],
          correct: 1,
          hint: "In deep networks, gradients can become tiny in early layers",
          nextHint: "Makes it hard for early layers to learn, common with sigmoid"
        },
        {
          question: "What is dropout?",
          options: ["Adding more neurons", "Randomly disabling neurons", "Removing layers", "Stopping training"],
          correct: 1,
          hint: "A regularization technique to prevent overfitting",
          nextHint: "During training, randomly set some neuron outputs to 0"
        },
        {
          question: "What is overfitting?",
          options: ["Model too simple", "Model memorizes training data", "Under-training", "Good generalization"],
          correct: 1,
          hint: "Model performs well on training but poorly on new data",
          nextHint: "The model learns noise instead of the underlying pattern"
        },
        {
          question: "What is a loss function?",
          options: ["Measure of model performance", "Optimization algorithm", "Activation function", "Layer type"],
          correct: 0,
          hint: "Tells us how wrong the predictions are",
          nextHint: "Mean Squared Error or Cross-Entropy are common examples"
        },
        {
          question: "What is an epoch?",
          options: ["One weight update", "One pass through all training data", "One batch", "One layer"],
          correct: 1,
          hint: "Complete iteration through the entire dataset",
          nextHint: "Training usually requires multiple epochs"
        }
      ],
      advanced: [
        {
          question: "What is batch normalization?",
          options: ["Removing outliers", "Normalizing layer inputs", "Batch size tuning", "Data cleaning"],
          correct: 1,
          hint: "Normalizes the inputs to each layer to improve training",
          nextHint: "Helps with internal covariate shift and allows higher learning rates"
        },
        {
          question: "What is transfer learning?",
          options: ["Moving data", "Using pre-trained models", "Copying weights", "Switching datasets"],
          correct: 1,
          hint: "Leveraging knowledge from one task for another",
          nextHint: "Use a model trained on large dataset, fine-tune for specific task"
        },
        {
          question: "What is a CNN used for?",
          options: ["Text processing", "Image processing", "Audio processing", "Tabular data"],
          correct: 1,
          hint: "Convolutional Neural Networks excel at this type of data",
          nextHint: "Uses convolution filters to detect features like edges"
        },
        {
          question: "What is an RNN used for?",
          options: ["Images", "Sequential data", "Static data", "Random data"],
          correct: 1,
          hint: "Recurrent Neural Networks have memory of previous inputs",
          nextHint: "Good for time series, text, speech - data with sequence"
        },
        {
          question: "What is the exploding gradient problem?",
          options: ["Gradients too small", "Gradients become extremely large", "No learning", "Slow convergence"],
          correct: 1,
          hint: "Gradients grow exponentially in deep networks",
          nextHint: "Can cause numerical overflow and unstable training"
        },
        {
          question: "What is weight initialization important?",
          options: ["It doesn't matter", "Prevents vanishing/exploding gradients", "Makes model larger", "Reduces parameters"],
          correct: 1,
          hint: "Starting weights affect how well the network trains",
          nextHint: "Xavier/Glorot initialization helps with deep networks"
        },
        {
          question: "What is data augmentation?",
          options: ["Collecting more data", "Artificially expanding dataset", "Reducing data", "Cleaning data"],
          correct: 1,
          hint: "Creating modified versions of existing data",
          nextHint: "Rotating, flipping, cropping images to get more training samples"
        },
        {
          question: "What is early stopping?",
          options: ["Stopping immediately", "Stopping when validation loss increases", "Training forever", "Random stopping"],
          correct: 1,
          hint: "Prevent overfitting by stopping at the right time",
          nextHint: "Monitor validation loss, stop when it stops improving"
        }
      ]
    }
  },
  
  // Continue with more levels...
  2: {
    name: "Deep Learning",
    sections: {
      basic: [
        {
          question: "What makes a network 'deep'?",
          options: ["More neurons", "More hidden layers", "More data", "More epochs"],
          correct: 1,
          hint: "It's about the architecture, not just size",
          nextHint: "Multiple hidden layers allow learning hierarchical features"
        },
        {
          question: "What is a feature map in CNNs?",
          options: ["Input image", "Output of convolution layer", "Final prediction", "Loss value"],
          correct: 1,
          hint: "Result of applying filters to input",
          nextHint: "Shows where specific features (edges, textures) are detected"
        }
      ],
      intermediate: [
        // Add more questions...
      ],
      advanced: [
        // Add more questions...
      ]
    }
  }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GAME_QUESTIONS };
}
